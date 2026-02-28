
using System;

namespace DelegateDemo
{
    // 1. Create delegate
    public delegate void NotificationSender(string message);

    // 2. Create Notifiers class
    class Notifiers
    {
        public static void SendEmail(string message)
        {
            Console.WriteLine("Email Notification: " + message);
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine("SMS Notification: " + message);
        }

        public static void SendPushNotification(string message)
        {
            Console.WriteLine("Push Notification: " + message);
        }
    }

    // 3. Create NotificationManager class
    class NotificationManager
    {
        public void NotifyUser(string message, NotificationSender sender)
        {
            sender(message); // invoking delegate
        }
    }

    class TestApp
    {
        static void Main(string[] args)
        {
            // 4. Create object of NotificationManager
            NotificationManager manager = new NotificationManager();

            // Send Email
            manager.NotifyUser("Welcome User!", Notifiers.SendEmail);

            // Send SMS
            manager.NotifyUser("Your OTP is 1234", Notifiers.SendSMS);

            // Send Push Notification
            manager.NotifyUser("You have a new message", Notifiers.SendPushNotification);

            Console.ReadLine();
        }
    }
}

