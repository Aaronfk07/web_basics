import ListItem from './ListItem';

export default function List() {
  return (
    <div className="w-48">
      <ListItem text="Coffee" />
      <ListItem text="Tea" />
      <ListItem text="Beer" />
    </div>
  );
}
