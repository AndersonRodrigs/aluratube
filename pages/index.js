import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { videoService } from "../src/services/videoService"
import { StyledFavoritos } from "../src/components/FavoritosArea"

function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  const [playlists, setplaylists] = React.useState({})

  React.useEffect(() => {
    console.log("useEfect")
    service.getAllVideos().then(dados => {
      console.log(dados.data[1])
      const novasPlaylists = { ...playlists }
      dados.data.forEach(video => {
        if (!novasPlaylists[video.playlist]) {
          novasPlaylists[video.playlist] = []
        }
        novasPlaylists[video.playlist].push(video)
      })
      setplaylists(novasPlaylists)
    })
  }, [])

  return (
    <>
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
        <Favorites searchValue={valorDoFiltro} playlists={config.favoritos}/>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  padding-top: 56px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    div {
      a{
        color: ${({ theme }) => theme.textColorBase || "#222222"};
      }
    }
  }
`

const StyledBaner = styled.div`
  background-image: url(${({ theme }) => theme.bg || "#222222"});
  /* background-image: url(${config.bg}); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: calc(100%);
  height: 230px;
`
function Header() {
  return (
    <StyledHeader>
      <StyledBaner bg={config.bg} />
      <section className="user-info">
        <img
          src={`https://github.com/${config.github}.png`}
          alt="foto-perfil"
        />
        <div>
          <a href={`https://github.com/${config.github}`} target="_blank"><h2>{config.name}</h2></a>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>
      {playlistsNames.map(playlistsName => {
        const videos = props.playlists[playlistsName]
        return (
          <section key={playlistsName}>
            <h2>{playlistsName}</h2>
            <div>
              {videos
                .filter(video => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map(video => {
                  return (
                    <a key={video.url} href={video.url} target="_blank">
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

function Favorites({ searchValue, ...props }) {
  const favoritesNomes = Object.keys(props.playlists)

  return (
    <StyledFavoritos>
      {favoritesNomes.map(favoritesName => {
        const nomes = props.playlists[favoritesName]
        return (
          <section key={favoritesName}>
            <h2>{favoritesNomes}</h2>
            <div>
              {nomes.map(nome => {
                return (
                  <a key={nome.url} href={nome.url} target="_blank">
                  <img src={nome.image}/>
                  <span>
                    {nome.nome}
                  </span>
                </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledFavoritos>
  )
}