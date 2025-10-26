import { Tweet } from 'react-tweet'


const Twiter = ({link}:{link:string}) => {
    const getTweetId=(url:string):string|null=>{
      if (!url) {
        return null
      }
    const match=url.match(/status\/(\d+)/);
    if (match) {
      return match[1]
    }
    return null
  }
  const id=getTweetId(link)
  return (
    <div className='w-full'>{id&&<Tweet id={id}/>}</div>
  )
}

export default Twiter