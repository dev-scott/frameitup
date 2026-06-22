import { Injectable } from '@nestjs/common';
import { db } from '@frameitup/database';

@Injectable()
export class AuthService {
  async getOrCreateUser(clerkId: string, email: string, firstName: string, lastName: string) {
    return db.user.upsert({
      where: { clerkId },
      update: { email, firstName, lastName },
      create: { clerkId, email, firstName, lastName },
    });
  }

  async getUserByClerkId(clerkId: string) {
    return db.user.findUnique({ where: { clerkId } });
  }
}
