interface ListItemProps {
  text: string;
}

export default function ListItem({ text }: ListItemProps) {
  return (
    <div className="bg-teal-600 text-white px-4 py-3 border-b border-teal-500 hover:bg-teal-700 transition-colors cursor-pointer">
      {text}
    </div>
  );
}
