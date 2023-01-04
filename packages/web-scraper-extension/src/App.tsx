interface AppPropTypes {
  children: JSX.Element;
}

function App({
  children
}: AppPropTypes) {
  return (
    <div className="App">
      {children}
    </div>
  );
}

export default App;
