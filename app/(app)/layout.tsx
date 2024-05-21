import Navbar from '@/components/Navbar';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>
        <Navbar/>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default AppLayout