import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect (
    state => state.chatuser,
    {getUserList}
)
export default class Hunter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        this.props.getUserList('publisher')
    }

    render() {
        return <UserCard userlist = {this.props.userlist}></UserCard>
    }
}