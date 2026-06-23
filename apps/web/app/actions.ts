'use server';

import { db, OrderStatus, GlasingType, FrameMaterial } from '@frameitup/database';
import { currentUser } from '@clerk/nextjs/server';
import { Resend } from 'resend';

// ─── User Syncing Helper ──────────────────────────────────────────
async function getOrCreateDbUser() {
  const guestUser = {
    id: 'usr_guest',
    clerkId: 'clerk_guest',
    email: 'guest@frameitup.com',
    firstName: 'Guest',
    lastName: 'Customer',
    role: 'CUSTOMER' as const,
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: null,
    orders: [],
  };

  let clerkUser = null;
  try {
    clerkUser = await currentUser();
  } catch (_e) {
    // Clerk not configured or called outside middleware context — use guest
    console.warn('[actions] currentUser() unavailable, falling back to guest user.');
  }

  try {
    if (!clerkUser) {
      return await db.user.upsert({
        where: { email: 'guest@frameitup.com' },
        update: {},
        create: {
          id: 'usr_guest',
          clerkId: 'clerk_guest',
          email: 'guest@frameitup.com',
          firstName: 'Guest',
          lastName: 'Customer',
        },
      });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? '';
    return await db.user.upsert({
      where: { clerkId: clerkUser.id },
      update: {
        firstName: clerkUser.firstName ?? 'Customer',
        lastName: clerkUser.lastName ?? '',
        avatarUrl: clerkUser.imageUrl,
      },
      create: {
        clerkId: clerkUser.id,
        email: email,
        firstName: clerkUser.firstName ?? 'Customer',
        lastName: clerkUser.lastName ?? '',
        avatarUrl: clerkUser.imageUrl,
      },
    });
  } catch (dbError) {
    console.error('[actions] DB upsert failed, using in-memory guest:', dbError);
    return guestUser;
  }
}

// ─── Fetch All Available Frames ────────────────────────────────────
export async function getSeedFrames() {
  try {
    const frames = await db.frame.findMany({
      where: { available: true },
    });
    
    // In case DB is not seeded yet, return nice defaults
    if (frames.length === 0) {
      return [
        {
          id: 'frame-matte-black',
          name: 'Matte Black',
          material: FrameMaterial.METAL,
          color: '#1A1A1A',
          widthMm: 20,
          heightMm: 20,
          depthMm: 10,
          priceUsd: 39.99,
          thumbnailUrl: '/frames/matte-black.webp',
          available: true,
        },
        {
          id: 'frame-oak-classic',
          name: 'Oak Classic',
          material: FrameMaterial.WOOD,
          color: '#8B6914',
          widthMm: 30,
          heightMm: 30,
          depthMm: 15,
          priceUsd: 49.99,
          thumbnailUrl: '/frames/oak-classic.webp',
          available: true,
        },
        {
          id: 'frame-museum-gold',
          name: 'Museum Gold',
          material: FrameMaterial.WOOD,
          color: '#D4AF37',
          widthMm: 50,
          heightMm: 50,
          depthMm: 20,
          priceUsd: 89.99,
          thumbnailUrl: '/frames/museum-gold.webp',
          available: true,
        }
      ];
    }

    // Convert decimal numbers to numbers for next compatibility
    return frames.map((f: any) => ({
      ...f,
      priceUsd: Number(f.priceUsd),
    }));
  } catch (error) {
    console.error('Error fetching frames:', error);
    // Return absolute fallback defaults
    return [
      {
        id: 'frame-matte-black',
        name: 'Matte Black',
        material: 'METAL',
        color: '#1A1A1A',
        widthMm: 20,
        heightMm: 20,
        depthMm: 10,
        priceUsd: 39.99,
        thumbnailUrl: '/frames/matte-black.webp',
        available: true,
      },
      {
        id: 'frame-oak-classic',
        name: 'Oak Classic',
        material: 'WOOD',
        color: '#8B6914',
        widthMm: 30,
        heightMm: 30,
        depthMm: 15,
        priceUsd: 49.99,
        thumbnailUrl: '/frames/oak-classic.webp',
        available: true,
      },
      {
        id: 'frame-museum-gold',
        name: 'Museum Gold',
        material: 'WOOD',
        color: '#D4AF37',
        widthMm: 50,
        heightMm: 50,
        depthMm: 20,
        priceUsd: 89.99,
        thumbnailUrl: '/frames/museum-gold.webp',
        available: true,
      }
    ];
  }
}

// ─── Create Custom Framing Order ───────────────────────────────────
export interface CreateOrderParams {
  shipping: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: Array<{
    frameId: string;
    imageUrl: string;
    matColor?: string;
    glasingType: string;
    widthPx: number;
    heightPx: number;
    quantity: number;
    unitPriceUsd: number;
  }>;
  totalUsd: number;
  paymentMethod: 'CASH_ON_DELIVERY' | 'MTN_MOMO' | 'ORANGE_MONEY';
  transactionId?: string;
}

export async function createOrder(params: CreateOrderParams) {
  try {
    const user = await getOrCreateDbUser();
    
    // Generate simple readable tracking number: FRM-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `FRM-${randomSuffix}`;

    // COD is PENDING, Mobile Money is PAYMENT_CONFIRMED (since CinetPay is approved)
    const orderStatus = params.paymentMethod === 'CASH_ON_DELIVERY' 
      ? OrderStatus.PENDING 
      : OrderStatus.PAYMENT_CONFIRMED;

    // Use transaction ID or COD stamp for stripePaymentIntentId (existing unique DB field)
    const payToken = params.transactionId || `${params.paymentMethod}-${trackingNumber}-${Date.now()}`;

    const newOrder = await db.order.create({
      data: {
        userId: user.id,
        status: orderStatus,
        shippingLine1: params.shipping.line1,
        shippingLine2: params.shipping.line2 ?? null,
        shippingCity: params.shipping.city,
        shippingState: params.shipping.state,
        shippingPostalCode: params.shipping.postalCode,
        shippingCountry: params.shipping.country,
        totalUsd: params.totalUsd,
        stripePaymentIntentId: payToken,
        trackingNumber: trackingNumber,
        items: {
          create: params.items.map((item) => ({
            frameId: item.frameId,
            imageUrl: item.imageUrl,
            matColor: item.matColor ?? null,
            glasingType: item.glasingType as GlasingType,
            widthPx: item.widthPx,
            heightPx: item.heightPx,
            quantity: item.quantity,
            unitPriceUsd: item.unitPriceUsd,
          })),
        },
      },
      include: {
        items: {
          include: {
            frame: true,
          },
        },
      },
    });

    // Fire email invoice sending as background operation
    try {
      await sendInvoiceEmail({
        orderId: newOrder.id,
        trackingNumber: newOrder.trackingNumber!,
        totalUsd: Number(newOrder.totalUsd),
        status: newOrder.status,
        shipping: params.shipping,
        items: params.items,
        paymentMethod: params.paymentMethod,
        createdAt: newOrder.createdAt
      }, params.shipping.email);
    } catch (e) {
      console.error('Failed to trigger invoice email dispatch:', e);
    }

    return {
      success: true,
      order: {
        id: newOrder.id,
        trackingNumber: newOrder.trackingNumber,
        totalUsd: Number(newOrder.totalUsd),
        status: newOrder.status,
      },
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during order placement',
    };
  }
}

// ─── Fetch User Order History ──────────────────────────────────────
export async function getUserOrders() {
  try {
    const user = await getOrCreateDbUser();
    const orders = await db.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            frame: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order: any) => ({
      id: order.id,
      status: order.status,
      shippingLine1: order.shippingLine1,
      shippingCity: order.shippingCity,
      shippingState: order.shippingState,
      shippingPostalCode: order.shippingPostalCode,
      shippingCountry: order.shippingCountry,
      totalUsd: Number(order.totalUsd),
      trackingNumber: order.trackingNumber,
      createdAt: order.createdAt,
      items: order.items.map((item: any) => ({
        id: item.id,
        frameName: item.frame.name,
        frameColor: item.frame.color,
        imageUrl: item.imageUrl,
        matColor: item.matColor,
        glasingType: item.glasingType,
        quantity: item.quantity,
        unitPriceUsd: Number(item.unitPriceUsd),
      })),
    }));
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
}

// ─── Email Invoice Sending Helper ──────────────────────────────────
async function sendInvoiceEmail(order: any, clientEmail: string) {
  const { orderId, trackingNumber, totalUsd, shipping, items, paymentMethod, createdAt } = order;
  const isCod = paymentMethod === 'CASH_ON_DELIVERY';
  const paymentMethodLabel = isCod 
    ? 'Paiement à la livraison (Cash on Delivery)' 
    : paymentMethod === 'MTN_MOMO' 
      ? 'MTN Mobile Money' 
      : 'Orange Money';

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #EDE8E3;">
        <strong>Cadre Personnalisé (Réf: ${item.frameId})</strong><br>
        <span style="font-size: 11px; color: #78716C;">
          Dimensions: ${item.widthPx}x${item.heightPx}mm | Passe-partout: ${item.matColor ? 'Oui' : 'Non'} | Verre: ${item.glasingType.replace('_', ' ')}
        </span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #EDE8E3; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #EDE8E3; text-align: right;">$${Number(item.unitPriceUsd).toFixed(2)}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="font-family: 'Inter', system-ui, sans-serif; background-color: #FAFAF9; color: #1C1917; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #EDE8E3; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="font-size: 26px; font-weight: bold; margin: 0; color: #1C1917;">Frame<span style="color: #d98d2e;">ItUp</span></h2>
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716C; margin: 5px 0 0 0;">Facture & Reçu d'Achat</p>
      </div>

      <div style="background-color: #FFFFFF; border: 1px solid #EDE8E3; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding-bottom: 10px; color: #78716C;">Numéro de Facture:</td>
            <td style="padding-bottom: 10px; text-align: right; font-weight: bold;">${orderId}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 10px; color: #78716C;">Code Suivi Colis:</td>
            <td style="padding-bottom: 10px; text-align: right; font-weight: bold; color: #d98d2e; font-family: monospace;">${trackingNumber}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 10px; color: #78716C;">Date:</td>
            <td style="padding-bottom: 10px; text-align: right;">${new Date(createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</td>
          </tr>
          <tr>
            <td style="color: #78716C;">Méthode de Paiement:</td>
            <td style="text-align: right; font-weight: bold; color: ${isCod ? '#e4a44a' : '#10B981'};">${paymentMethodLabel}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 12px; text-transform: uppercase; color: #78716C; margin-bottom: 10px; letter-spacing: 0.5px;">Adresse de Livraison</h4>
        <div style="font-size: 13px; color: #44403C; background-color: #F5F0EB; padding: 16px; border-radius: 8px;">
          <strong>${shipping.firstName} ${shipping.lastName}</strong><br>
          ${shipping.line1}${shipping.line2 ? `, ${shipping.line2}` : ''}<br>
          ${shipping.postalCode} ${shipping.city}, ${shipping.state}<br>
          ${shipping.country}<br>
          <span style="font-size: 11px; color: #78716C;">E-mail client: ${shipping.email}</span>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h4 style="font-size: 12px; text-transform: uppercase; color: #78716C; margin-bottom: 10px; letter-spacing: 0.5px;">Détails de l'article</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #EDE8E3;">
              <th style="padding: 10px; text-align: left; font-weight: bold;">Configuration</th>
              <th style="padding: 10px; text-align: center; font-weight: bold;">Qté</th>
              <th style="padding: 10px; text-align: right; font-weight: bold;">Prix</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <div style="border-top: 2px solid #EDE8E3; padding-top: 15px; text-align: right; margin-bottom: 30px;">
        <span style="font-size: 12px; text-transform: uppercase; color: #78716C;">Montant total :</span>
        <h3 style="font-size: 24px; font-weight: 900; margin: 5px 0 0 0; color: #d98d2e;">$${totalUsd.toFixed(2)}</h3>
        ${isCod 
          ? '<span style="font-size: 11px; color: #e4a44a; font-weight: bold;">À payer en espèces au livreur lors de la livraison</span>' 
          : '<span style="font-size: 11px; color: #10B981; font-weight: bold;">Réglé en ligne avec succès via CinetPay</span>'}
      </div>

      <div style="text-align: center; font-size: 11px; color: #A8A29E; border-top: 1px solid #EDE8E3; padding-top: 20px;">
        <p>Des questions concernant votre commande ? Contactez notre support à support@frameitup.com</p>
        <p>© 2026 FrameItUp S.A. Tous droits réservés.</p>
      </div>
    </div>
  `;

  // Dispatch using Resend API if API Key is set
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'FrameItUp <receipts@frameitup.com>',
        to: clientEmail,
        subject: `Facture FrameItUp ${trackingNumber} - Confirmation de commande`,
        html: emailHtml,
      });
      console.log(`[Resend dispatch successful] Invoice sent to ${clientEmail}`);
    } catch (e) {
      console.error('[Resend Error] Failed to send email via Resend API:', e);
      console.log(`\n--- [FALLBACK MOCK EMAIL DISPATCH] ---\nTo: ${clientEmail}\nSubject: Facture FrameItUp ${trackingNumber}\nContent:\n${emailHtml}\n---------------------------------------\n`);
    }
  } else {
    // Standard mock print for local developers / sandboxes without API Key
    console.log(`\n--- [MOCK EMAIL DISPATCH - NO RESEND API KEY] ---\nTo: ${clientEmail}\nSubject: Facture FrameItUp ${trackingNumber}\nContent:\n${emailHtml}\n-------------------------------------------------\n`);
  }
}
