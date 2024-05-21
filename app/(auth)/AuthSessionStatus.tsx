const AuthSessionStatus = ({ status, className, ...props }: {status: string | null, className: string}) => {
  return (
    <>
      {status && (
        <div
          className={`${className} font-medium text-sm text-green-600`}
          {...props}>
            {status}
        </div>
      )}
    </>
  )
}

export default AuthSessionStatus