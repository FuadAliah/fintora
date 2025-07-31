export default function TransactionForm({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) {
  const onSubmit = () => {
    onCloseDrawer();
  };

  return (
    <div className="relative pb-10 pt-5 px-2.5" onClick={onSubmit}>
      Form
    </div>
  );
}
