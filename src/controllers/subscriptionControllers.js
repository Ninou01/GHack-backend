import * as subscriptionService from '../services/subscriptionServices.js';
import { successResponse, errorResponse } from '../utils/responseSending.js';

export async function getAllSubscriptions(req, res) {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    successResponse(res, 'Subscriptions retrieved successfully', subscriptions, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Internal Server Error', 500);
  }
}

export async function getSubscriptionById(req, res) {
  const subscriptionId = parseInt(req.params.id, 10);
  try {
    const subscription = await subscriptionService.getSubscriptionById(subscriptionId);
    if (!subscription) {
      errorResponse(res, 'Subscription not found', 404);
      return;
    }
    successResponse(res, 'Subscription retrieved successfully', subscription, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Internal Server Error', 500);
  }
}

export async function createSubscription(req, res) {
  const subscriptionData = req.body;
  try {
    const newSubscription = await subscriptionService.createSubscription(subscriptionData);
    successResponse(res, 'Subscription created successfully', newSubscription, 201);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Internal Server Error', 500);
  }
}

export async function updateSubscription(req, res) {
  const subscriptionId = parseInt(req.params.id, 10);
  const updatedSubscriptionData = req.body;
  try {
    const updatedSubscription = await subscriptionService.updateSubscription(subscriptionId, updatedSubscriptionData);
    successResponse(res, 'Subscription updated successfully', updatedSubscription, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Internal Server Error', 500);
  }
}

export async function deleteSubscription(req, res) {
  const subscriptionId = parseInt(req.params.id, 10);
  try {
    const deletedSubscription = await subscriptionService.deleteSubscription(subscriptionId);
    successResponse(res, 'Subscription deleted successfully', deletedSubscription, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Internal Server Error', 500);
  }
}
