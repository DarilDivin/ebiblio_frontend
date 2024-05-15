const AuthSessionStatus = ({ status, className, ...props }) => {
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