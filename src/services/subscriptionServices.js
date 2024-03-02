import prisma from "../config/prisma.js";

export async function getAllSubscriptions() {
  return prisma.subscription.findMany();
}

export async function getSubscriptionById(subscriptionId) {
  return prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });
}

export async function createSubscription(subscriptionData) {
  return prisma.subscription.create({
    data: subscriptionData,
  });
}

export async function updateSubscription(subscriptionId, updatedSubscriptionData) {
  return prisma.subscription.update({
    where: { id: subscriptionId },
    data: updatedSubscriptionData,
  });
}

export async function deleteSubscription(subscriptionId) {
  return prisma.subscription.delete({
    where: { id: subscriptionId },
  });
}
