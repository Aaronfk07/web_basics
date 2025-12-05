import Card from './components/card';
import Button from './components/Button';
import Card2 from './components/Card2';
import List from './components/List';

export default function App() {
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">4 Aufgabe Komponenten</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Button</h2>
          <Button />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Card</h2>
          <Card2 />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Liste</h2>
          <List />
        </div>
      </div>

      <hr className="my-8" />
      
      <h2 className="text-2xl font-bold mb-4">Alte Karten</h2>
      <div className='grid grid-cols-2 w-80 gap-4'>
        <Card title='aaron' description='A description about aaron' />
        <Card title='susi' description='A description about susi' />
        <Card title='hans' description='A description about hans' />
        <Card title='lena' description='A description about lena' />
        
      </div>
      
    </div>

  );
}

