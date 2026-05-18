import React, { useEffect, useState } from "react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [inputPin, setInputPin] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("vault_files");
    if (saved) setFiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("vault_files", JSON.stringify(files));
  }, [files]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        url: reader.result,
        favorite: false,
      };

      setFiles((prev) => [newFile, ...prev]);
    };

    reader.readAsDataURL(file);
  };

  const removeFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const toggleFavorite = (id) => {
    setFiles(
      files.map((f) =>
        f.id === id
          ? { ...f, favorite: !f.favorite }
          : f
      )
    );
  };

  const downloadFile = (file) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    a.click();
  };

  const getCategory = (file) => {
    if (file.type.startsWith("image")) return "photo";
    if (file.type.startsWith("video")) return "video";
    if (file.type.startsWith("audio")) return "music";
    return "file";
  };

  const filteredFiles = files.filter((file) => {
    if (category === "all") return true;
    if (category === "favorite") return file.favorite;
    return getCategory(file) === category;
  });

  const savePin = () => {
    localStorage.setItem("vault_pin", inputPin);
    alert("PIN berhasil disimpan 🔒");
    setInputPin("");
  };

  return (
    <div className="app">

      <style>{`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:sans-serif;
        }

        body{
          background:black;
        }

        .app{
          min-height:100vh;
          padding:20px;
          color:white;

          background:
          linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.6)),
          url("https://i.ibb.co.com/yc2Dt6f8/d4e0c5dcc6576ae903e85b04290c2d64.jpg");

          background-size:cover;
          background-position:center;
          background-attachment:fixed;
        }

        .topbar{
          position:relative;
          z-index:999;

          display:flex;
          justify-content:space-between;
          align-items:center;

          padding:18px;

          border-radius:28px;

          background:rgba(255,255,255,.08);
          backdrop-filter:blur(15px);

          border:1px solid rgba(255,255,255,.1);

          margin-bottom:22px;
        }

        .logo{
          display:flex;
          align-items:center;
          gap:15px;
        }

        .logo img{
          width:65px;
          height:65px;
          border-radius:20px;
          object-fit:cover;
        }

        .logo h1{
          font-size:25px;
          font-weight:bold;
        }

        .logo p{
          color:#ddd;
          margin-top:5px;
        }

        .menu-btn{
          width:40px;
          height:40px;

          border:none;
          border-radius:14px;

          background:rgba(255,255,255,.1);

          color:white;
          font-size:22px;
        }

        .menu-popup{
          position:absolute;
          top:75px;
          right:0;

          width:250px;

          background:rgba(0,0,0,.88);
          backdrop-filter:blur(18px);

          border-radius:24px;
          padding:15px;

          animation:popup .2s ease;
        }

        @keyframes popup{
          from{
            opacity:0;
            transform:translateY(-10px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .menu-popup button{
          width:100%;

          border:none;
          border-radius:16px;

          padding:15px;
          margin-top:10px;

          background:rgba(255,255,255,.08);

          color:white;
          text-align:left;
          font-size:16px;
        }

        .privacy-box{
          margin-top:15px;
        }

        .privacy-box input{
          width:100%;
          padding:14px;

          border:none;
          outline:none;

          border-radius:15px;

          background:#111;
          color:white;

          margin-bottom:10px;
        }

        .save-btn{
          background:#ff0088 !important;
          text-align:center !important;
        }

        .category-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:18px;

          margin-bottom:25px;
        }

        .card{
          padding:24px;

          border-radius:30px;

          background:rgba(255,255,255,.1);
          backdrop-filter:blur(16px);

          border:1px solid rgba(255,255,255,.1);

          transition:.15s;
        }

        .card:active{
          transform:scale(.95);
        }

        .card h2{
          font-size:21px;
        }

        .card p{
          margin-top:10px;
          color:#ddd;
          line-height:1.5;
        }

        .upload{
          display:block;
          width:100%;

          background:#ff0088;

          padding:18px;

          border-radius:22px;

          text-align:center;
          font-size:19px;
          font-weight:bold;

          margin-bottom:25px;
        }

        .file-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:18px;
        }

        .file-card{
          background:rgba(0,0,0,.65);

          border-radius:28px;
          overflow:hidden;

          backdrop-filter:blur(10px);

          animation:show .2s ease;
        }

        @keyframes show{
          from{
            opacity:0;
            transform:translateY(10px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .preview-box{
          position:relative;
        }

        .preview{
          width:100%;
          height:220px;
          object-fit:cover;
          background:#111;
        }

        .music-box{
          height:220px;

          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;

          background:#111;
        }

        .music-icon{
          font-size:60px;
          margin-bottom:15px;
        }

        .audio-player{
          width:90%;
        }

        .doc-box{
          height:220px;

          display:flex;
          justify-content:center;
          align-items:center;

          font-size:70px;

          background:#111;
        }

        .fav-floating{
          position:absolute;
          bottom:10px;
          right:10px;

          width:42px;
          height:42px;

          border:none;
          border-radius:14px;

          background:orange;

          color:white;
          font-size:20px;
        }

        .button-column{
          display:flex;
          flex-direction:column;
          gap:10px;

          padding:12px;
        }

        .button-column button{
          width:100%;

          border:none;
          border-radius:15px;

          padding:14px;

          color:white;
          font-weight:bold;
          font-size:16px;
        }

        .download{
          background:#00c853;
        }

        .delete{
          background:#ff1744;
        }

      `}</style>

      <div className="topbar">

        <div className="logo">

          <img src="https://i.ibb.co.com/yc2Dt6f8/d4e0c5dcc6576ae903e85b04290c2d64.jpg" />

          <div>
            <h1>Jacklynn Hoshino Vault</h1>
            <p>Made for Jeky ❤️</p>
          </div>

        </div>

        <button
          className="menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋮
        </button>

        {showMenu && (

          <div className="menu-popup">

            <button
              onClick={() => setShowPrivacy(!showPrivacy)}
            >
              🔒 Privacy
            </button>

            <button>
              👆 Fingerprint Unlock
            </button>

            <button>
              🗑️ Recycle Bin
            </button>

            {showPrivacy && (

              <div className="privacy-box">

                <input
                  type="password"
                  placeholder="Masukkan PIN"
                  value={inputPin}
                  onChange={(e) =>
                    setInputPin(e.target.value)
                  }
                />

                <button
                  className="save-btn"
                  onClick={savePin}
                >
                  Simpan PIN
                </button>

              </div>

            )}

          </div>

        )}

      </div>

      <div className="category-grid">

        <div
          className="card"
          onClick={() => setCategory("photo")}
        >
          <h2>🖼️ Foto</h2>
          <p>PNG, JPG, WEBP</p>
        </div>

        <div
          className="card"
          onClick={() => setCategory("video")}
        >
          <h2>🎥 Video</h2>
          <p>MP4, MKV, MOV</p>
        </div>

        <div
          className="card"
          onClick={() => setCategory("file")}
        >
          <h2>📁 File</h2>
          <p>APK, ZIP, PDF</p>
        </div>

        <div
          className="card"
          onClick={() => setCategory("favorite")}
        >
          <h2>⭐ Favorite</h2>
          <p>File favorit kamu</p>
        </div>

        <div
          className="card"
          onClick={() => setCategory("music")}
        >
          <h2>🎵 Music</h2>
          <p>MP3, WAV, OGG</p>
        </div>

        <div
          className="card"
          onClick={() => setCategory("all")}
        >
          <h2>🌸 Semua</h2>
          <p>Semua file tersimpan</p>
        </div>

      </div>

      <label className="upload">

        Upload File

        <input
          hidden
          type="file"
          onChange={uploadFile}
        />

      </label>

      <div className="file-grid">

        {filteredFiles.map((file) => (

          <div className="file-card" key={file.id}>

            <div className="preview-box">

              {file.type.startsWith("image") && (
                <img
                  src={file.url}
                  className="preview"
                />
              )}

              {file.type.startsWith("video") && (
                <video
                  src={file.url}
                  controls
                  className="preview"
                />
              )}

              {file.type.startsWith("audio") && (

                <div className="music-box">

                  <div className="music-icon">
                    🎵
                  </div>

                  <audio
                    src={file.url}
                    controls
                    className="audio-player"
                  />

                </div>

              )}

              {!file.type.startsWith("image") &&
               !file.type.startsWith("video") &&
               !file.type.startsWith("audio") && (

                <div className="doc-box">
                  📄
                </div>

              )}

              <button
                className="fav-floating"
                onClick={() => toggleFavorite(file.id)}
              >
                ⭐
              </button>

            </div>

            <div className="button-column">

              <button
                className="download"
                onClick={() => downloadFile(file)}
              >
                Download
              </button>

              <button
                className="delete"
                onClick={() => removeFile(file.id)}
              >
                Hapus
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
