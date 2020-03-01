import React from 'react';
import batmanList from './resources/batmanList.json';


class Main extends React.Component { // main divs etc
    render() { // au sein du div root spécifié dans index.html
        return (
            <div>
                <div className='header'> Header</div>
                <div className='description'> description</div>
                <div className='MyDynamicDiv'><MyDynamicDiv></MyDynamicDiv></div>
            </div>
        )
    }
}

class MyDynamicDiv extends React.Component { // un div unique
    constructor(props) {
        super(props);
        this.state = {
            currentBatman: "",
            formOK: false
        }
    }


    formCallback = (formReturn) => { // "arrow function", pour que 'this' corresponde bien à la méthode et pas à un objet html
        console.log("formCallback: formReturn = " + formReturn);
        // this.setState({currentBatman: })
        this.setState({ formOK: formReturn, currentBatman: document.getElementById("inputNom").value });
        console.log("formCallback: state = " + JSON.stringify(this.state)); // state non mis à jour à ce point ?
    }

    render() {
        console.log("MyDynamicDiv.render: state = " + JSON.stringify(this.state));
        var toRender = "";

        if (!this.state.formOK) {
            toRender = <BatmanForm formCallback={this.formCallback} />
        } else {
            toRender = <BatmanTrio currentBatman={this.state.currentBatman} />
        }

        return (toRender)
    }
}

class BatmanForm extends React.Component { // juste le formulaire
    // constructor(props) {
    //     super(props);
    // }

    handleSubmit = (event) => { // pour que la fonction soit dans le meme contexte que la classe
        event.preventDefault(); // nécessaire pour override ?

        const nom = document.getElementById("inputNom").value;
        const prenom = document.getElementById("inputPrenom").value;

        console.log("BatmanForm: inputs: nom = " + nom + "; prenom = " + prenom);

        const formOK = true;

        this.props.formCallback(formOK);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>
                            Ton adressse mail Cap: <br />
                            <input id="inputMail" type="text" placeholder="Mail" defaultValue="die.hard@boom.ca" /><br />
                        </p>
                        <p>
                            Nom de ton/ta Bat(wo)man: <br />
                            <input id="inputNom" type="text" placeholder="Nom" defaultValue="Bruce" /><br />
                            <input id="inputPrenom" type="text" placeholder="Prénom" defaultValue="Willis" />

                        </p>
                    </label><br />
                    <input type="submit" value="Valider" />
                </form>
            </div>
        )
    }

}

class BatmanTrio extends React.Component { // retour avec la sélection des 3 batmans

    render() {
        console.log("BatmanTrio.props = " + JSON.stringify(this.props));
        console.log("BatmanTrio batmanList = " + JSON.stringify(batmanList));

        var currentBatmanPos = undefined;
        batmanList.list.forEach(el => {
            var searchBatman_i = el.name.search(this.props.currentBatman);
            if (searchBatman_i >= 0) { currentBatmanPos = el.id };
        });
        console.log("BatmanTrio currentBatmanPos = " + currentBatmanPos);

        const updatedList = batmanList.list;
        updatedList.splice(currentBatmanPos, 1);
        console.log("BatmanTrio updatedList 1 = " + JSON.stringify(updatedList));

        var batmansTrio = [];
        for (var i = 0; i < 3; i++) {
            const randBatmanPos = Math.floor(Math.random() * updatedList.length);
            batmansTrio.push(updatedList[randBatmanPos]);
            updatedList.splice(randBatmanPos, 1);
        }

        console.log("BatmanTrio updatedList 2 = " + JSON.stringify(updatedList));
        console.log("BatmanTrio batmansTrio = " + JSON.stringify(batmansTrio));

        return (
            <div>
                <div>Batman 1 = {batmansTrio[0].name}</div>
                <div>Batman 2 = {batmansTrio[1].name}</div>
                <div>Batman 3 = {batmansTrio[2].name}</div>
            </div>

        )
    }
}



//==============

export default Main;