export function spawnNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission == "denied") return;
  new Notification(title, options);
}
