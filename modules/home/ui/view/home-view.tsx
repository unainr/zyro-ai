import  { SpinningSphereBackground } from "../components/shader"

export const HomeView = () => {
  return (
    <>
     <div className="overflow-hidden h-full w-full relative" >
      <SpinningSphereBackground />
      {/* You can add other content here that floats above the canvas if needed */}
      
    </div>
      <h1>fine</h1>
    
    </>
  )
}
