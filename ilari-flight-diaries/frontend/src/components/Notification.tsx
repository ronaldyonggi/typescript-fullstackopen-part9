interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  if (message) {
    return <p style={{ color: 'red' }}>{message}</p>;
  }

  return null;
}
