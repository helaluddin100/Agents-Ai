const showNotification = (title: string, body: string) => {
  const notification = new Notification(title, {
    body: body,
    icon: process.env.NEXT_PUBLIC_BASE_URL + '/favicon.ico',
  });
  notification.onclick = (event) => {
    event.preventDefault();
    window.open(process.env.NEXT_PUBLIC_BASE_URL, '_blank');
  };
};

function urlBase64ToUint8Array(base64String: string) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const giveNoification = (title: string, body: string) => {
  // there are 3 states for notification permission - granted, denied and default
  if (Notification.permission === 'granted') {
    showNotification(title, body);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        showNotification(title, body);
      }
    });
  }
};

export const subscibeToPushNotification = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.pushManager.getSubscription().then((subscription) => {
      // const options = subscription?.options;
      if (!subscription) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
            ),
          })
          .then((sub) => {
            // send sub.toJSON() to server
            console.log(sub.toJSON());
          });
      } else {
        console.log(subscription.toJSON());
      }
    });
  }
};

export const askToSubscribeToPushNotification = async () => {
  navigator.serviceWorker.ready.then((registration) => {
    registration.pushManager.getSubscription().then((subscription) => {
      if (!subscription) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            subscibeToPushNotification();
          }
        });
      } else {
        // send subscription.toJSON() to server
        console.log(subscription.toJSON());
      }
    });
  });
};
