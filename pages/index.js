import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
  return (
    <>
     <CSSReset/>
    <div>
      <Menu/>
      <Header />
      <Timeline playlists={config.playlists} />
    </div>
    </>
  )
}

export default HomePage


const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info { 
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
  }
`

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner" alt="banner" /> */}
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

function Timeline(props) {
  const playlistsNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>
      {playlistsNames.map(playlistsName => {
        const videos = props.playlists[playlistsName]
        console.log(videos)
        return (
          <section>
            <h2>{playlistsName}</h2>
            <div>
              {videos.map(video => {
                return (
                  <a href={video.url}>
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
