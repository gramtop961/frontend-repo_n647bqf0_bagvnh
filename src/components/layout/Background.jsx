export default function Background() {
  return (
    <div className="app-background">
      <div className="background-blob blob-1" />
      <div className="background-blob blob-2" />
      <div className="background-blob blob-3" />
      <div className="background-noise" />
      <style>{`
        .app-background{position:fixed;inset:0;z-index:-1;animation:gradient-shift 30s ease infinite;background-size:200% 200%;}
        .background-blob{position:absolute;border-radius:40% 60% 70% 30% / 40% 50% 60% 50%;filter:blur(80px);opacity:.3;animation:float 20s ease-in-out infinite;}
        .blob-1{width:600px;height:600px;background:linear-gradient(135deg,#6366f1,#06b6d4);top:-200px;right:-200px;animation-delay:0s}
        .blob-2{width:800px;height:800px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);bottom:-300px;left:-300px;animation-delay:-7s}
        .blob-3{width:400px;height:400px;background:linear-gradient(135deg,#6366f1,#ec4899);top:50%;left:50%;animation-delay:-14s}
        @keyframes float{0%,100%{transform:translate(0,0) scale(1) rotate(0deg)}33%{transform:translate(30px,-30px) scale(1.1) rotate(5deg)}66%{transform:translate(-20px,20px) scale(.9) rotate(-5deg)}}
        @keyframes gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      `}</style>
    </div>
  )
}
