import Card from './components/card';

export default function App() {
  return (
  <div>
    <h1>Hello</h1>
<div className='grid grid-cols-2 w-80 gap-4'>
<Card title='aaron' description='A description about aaron' />
<Card title='susi' description='A description about susi' />

</div>
  </div>
);
}

