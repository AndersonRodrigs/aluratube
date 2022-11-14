import React from "react"
import { StyledRegisterVideo } from "./styles"
import { createClient } from "@supabase/supabase-js"

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)

  return {
    values,
    handleChange: evento => {
      console.log(evento.target)
      const value = evento.target.value
      const name = evento.target.name
      setValues({
        ...values,
        [name]: value
      })
    },
    clearForm() {
      setValues({})
    }
  }
}

const PROJECT_URL = "https://mnyfguhijmyqgnryzajf.supabase.co"
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ueWZndWhpam15cWducnl6YWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzM3NTEsImV4cCI6MTk4Mzk0OTc1MX0.rVigPZxkzGjNuj2bC-pc8ZbUZFrSNKEsZgjbx6krwPM"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "",
      url: ""
    }
  })
  const [formVisivel, setFormVisivel] = React.useState(false)

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={evento => {
            evento.preventDefault()
            console.log(formCadastro.values)

            // Contrato entre o nosso Front e o BackEnd
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "videos"
              })
              .then(oqueveio => {
                console.log(oqueveio)
              })
              .catch(err => {
                console.log("Err")
              })

            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  )
}
