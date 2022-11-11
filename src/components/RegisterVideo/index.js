import React from "react"
import { StyledRegisterVideo } from "./Styles"

function userForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)

  return {
    values,
    handleChange: e => {
      const value = e.target.value
      const name = e.target.value
      console.log(value)
      setValues({ ...value, [name]: value })
    },
    clearForm() {
      setValues({})
    }
  }
}

export default function RegisterVideo() {
  const formCadastro = userForm({
    initialValues: { titulo: "Frost punk", url: "https//yotube..." }
  })
  const [formVisivel, setFormVisivel] = React.useState(true)

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={e => {
            e.preventDefault()
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
              name="titulo"
              placeholder="Titulo do vídeo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              name="URL"
              placeholder="url"
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
