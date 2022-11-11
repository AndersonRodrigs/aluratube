import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  return (
    <>
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
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
  }
`

const StyledBaner = styled.div`
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  background-repeat: no-repeat;
  background-size: cover;
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
          <h2>{config.name}</h2>
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
                    <a key={video.url} href={video.url}>
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
