type Props = {
    title: string;
    description: string;
}

export default function card({title, description}: Props) {
  return (
    <div className="border bg-green-400">
<h2>{title}</h2>
<p>{description}</p>

    </div>
  )
}