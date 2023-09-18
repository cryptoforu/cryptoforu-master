const PolygonBlur = () => {
  return (
    <div
      className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl"
      aria-hidden="true"
    >
      <div
        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-emerald-400 to-teal-300 opacity-10"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  )
}
export default PolygonBlur
