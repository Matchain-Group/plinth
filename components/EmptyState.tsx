export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-4xl">🏠</div>
      <p className="font-display text-xl text-paper">{message}</p>
    </div>
  );
}
