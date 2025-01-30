function TestErrorComponent() {
  throw new Error('Это тестовая ошибка!');
  return <div>Этот текст никогда не отобразится</div>;
}

export default TestErrorComponent;
