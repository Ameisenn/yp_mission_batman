import React from 'react';


const listBatman = [
    "test 1",
    "test 2",
    "test 3"
];

class Main extends React.Component {

    render() {
        return (
            <div>
                <div className='header'> </div>
                <div className='description'> </div>

                <div className='dynamicDiv'><DynamicDiv></DynamicDiv></div>

            </div>
        )
    }

}

class DynamicDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBatman: "",
            formOK: false,
            selectedBatmans: []
        }
    }


    formCallback = (formReturn) => { // "arrow function", pour que 'this' corresponde bien à la méthode et pas à un objet html
    console.log("formReturn = " + formReturn);
        this.setState({formOK: formReturn });
        console.log("formOK = " + this.state.formOK);
    }

    render() {

        const toRender = this.state.formOK ? <div>OK</div> : <Form formCallback={this.formCallback} />;
        return (toRender);
    }


}

class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => { // pour que la fonction soit dans le meme contexte que la classe
        event.preventDefault();

        const nom = document.getElementById("inputNom").value;
        const prenom = document.getElementById("inputPrenom").value;

        console.log("inputs: nom = " + nom + "; prenom = " + prenom);
        // check si nom & prenom présents ds la BD$
        const formOK = true;

        this.props.formCallback(formOK);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom de ton/ta Bat(wo)man: <br />
                        <input id="inputNom" type="text" placeholder="Nom" /><br />
                        <input id="inputPrenom" type="text" placeholder="Prénom" />
                    </label><br />
                    <input type="submit" value="Valider" />
                </form>
            </div>
        )
    }

}





//==============

export default Main;