import React from 'react'


class CreateVehicleModel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      picture_url: '',
      manufacturer_id: '',
      manufacturers: [],
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePicUrlChange = this.handlePicUrlChange.bind(this)
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    const value = event.target.value
    this.setState({name:value})
  }

  handlePicUrlChange(event) {
    const value = event.target.value
    this.setState({picture_url:value})
  }

  handleManufacturerChange(event) {
    const value = event.target.value
    this.setState({manufacturer_id:Number(value)})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.manufacturers

    const modelUrl = 'http://localhost:8100/api/models/'
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const newModel = await response.json();
      const cleared = {
        name: '',
        picture_url: '',
        manufacturer: '',
      }
      this.setState(cleared)
    }
  }

  async componentDidMount () {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      this.setState({manufacturers:data.manufacturers})
    }
  }


  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new model</h1>
            <form onSubmit={this.handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePicUrlChange} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" value={this.state.picture_url} />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select required onChange={this.handleManufacturerChange} name="manufacturer" id="manufacturer" className="form-select" value={this.state.manufacturer}>
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer=> {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default CreateVehicleModel
