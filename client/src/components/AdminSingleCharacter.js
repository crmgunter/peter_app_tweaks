import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import EditCharacter from './EditCharacter'

export default class AdminSingleCharacter extends Component {

    state = {
        character: {
            name: '',
            description: '',
            portrait: '',
            tierLetter: ''
        },
        _id: '',
        updateView: false,
        redirect: false
    }

    onDeleteCharacter = async (characterId) => {
        console.log(this.state)
        await axios.delete(`/api/character/${characterId}`)
        const newState = { ...this.state }
        newState.redirect = true
        this.setState(newState)
    }

    componentDidMount() {
        this.getCharacterById()
    }

    getCharacterById = async () => {
        const characterId = this.props.match.params.characterId
        console.log('characterId', characterId)
        const res = await axios.get(`/api/character/${characterId}`)
        console.log(res.data)
        const newState = { ...this.state }
        newState.character = res.data
        this.setState(newState)
        console.log(this.state)
    }
    toggleUpdateView = async () => {
        const updateView = !this.state.updateView
        if (this.state.updateView === true) {

            try {
                const characterId = this.props.match.params.characterId
                console.log(this.state.character)
                const passState = this.state.character
                console.log(passState)
                await axios.put(`/api/character/${characterId}`, passState).bind(this)
            } catch (err) {
                console.log('Put Err')
                console.log(err)
            }

        }
        this.setState({ updateView: updateView })
    }

    onChangeCharacter = (evt) => {
        const newState = { ...this.state }
        newState.character[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <h1>(Admin) Single Character</h1>
                <img className='char-portrait' src={this.state.character.portrait} alt={`${this.state.character.name}-melee`} />
                <div><span>Name:</span> {this.state.character.name}</div>
                <div><span>Description:</span> {this.state.character.description}</div>
                <div><span>Tier:</span> {this.state.character.tierLetter}</div>
                <div className='controls'>
                    <button onClick={() => this.onDeleteCharacter(this.state.character._id)}>Delete</button>
                    <button onClick={this.toggleUpdateView}>Edit</button>
                </div>
                {this.state.updateView ? <EditCharacter name={this.state.character.name} description={this.state.character.description} portrait={this.state.character.portrait} onChangeCharacter={this.onChangeCharacter} /> : null}
            </div>
        )
    }
}