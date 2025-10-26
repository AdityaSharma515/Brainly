
const YouTube = ({link}:{link:string}) => {
  const getyturl=(url:string):string|null=>{
      if (!url) {
        return null
      }
    return url.replace("/watch?v=","/embed/");
  }
  const url=getyturl(link)
  return (
    <div>{url&&<iframe className="w-full h-64"  src={url}></iframe>}</div>
  )
}

export default YouTube