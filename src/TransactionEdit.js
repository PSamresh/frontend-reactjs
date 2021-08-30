import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TransactionEdit extends Component {

    emptyTransaction = {
        amount: '',
        memo: '',
        txndate: '',
        assignto: '',
        gst: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyTransaction
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const transaction = await (await fetch(`/api/transaction/${this.props.match.params.id}`)).json();
            this.setState({ item: transaction });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/api/transaction', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/transactions');
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Transaction' : 'Add Transaction'}</h2>;

        return <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="amount">amount</Label>
                        <Input type="text" name="amount" id="amount" value={item.amount || ''}
                            onChange={this.handleChange} autoComplete="amount" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="memo">memo</Label>
                        <Input type="text" name="memo" id="memo" value={item.memo || ''}
                            onChange={this.handleChange} autoComplete="memo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txndate">txndate</Label>
                        <Input type="text" name="txndate" id="txndate" value={item.txndate || ''}
                            onChange={this.handleChange} autoComplete="txndate" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="assignto">assignto</Label>
                        <Input type="text" name="assignto" id="assignto" value={item.assignto || ''}
                            onChange={this.handleChange} autoComplete="assignto" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="gst">gst</Label>
                        <Input type="text" name="gst" id="gst" value={item.gst || ''}
                            onChange={this.handleChange} autoComplete="gst" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/transactions">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(TransactionEdit);