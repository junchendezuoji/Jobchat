import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card,WingBlank } from 'antd-mobile'

@withRouter
export default class UserCard extends React.Component {
    //属性检测
    static PropTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v.user}`)
    }

    render() {
        return (
            <WingBlank>
                {this.props.userlist.map(v => (
                    v.avatar ? (<Card key={v._id} onClick = {() => this.handleClick(v)}>
                        <Card.Header title={v.user} thumb={require(`../img/${v.avatar}.png`)} extra={<span>{v.title}</span>}></Card.Header>
                        <Card.Body>
                            {v.type == 'publisher' ? <div>公司：{v.company}</div> : null}
                            {v.desc.split('\n').map(d => (
                                <div key={d} >{d}</div>
                            ))}
                            {v.type == 'publisher' ? <div>薪资：{v.money}</div> : null}
                        </Card.Body>
                    </Card>) : null 
                ))}
            </WingBlank>
        )
    }
}