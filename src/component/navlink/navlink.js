import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile';

@withRouter
export default class NavLinkBar extends React.Component {
    //属性检测
    static PropTypes = {
        data: PropTypes.array.isRequired
    }
    
    constructor(props) {
        super(props)
    }

    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const {pathname} = this.props.location
        return (
           <TabBar>
               {navList.map(v => (
                   <TabBar.Item 
                        key={v.path} 
                        title={v.text} 
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname == v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    ></TabBar.Item>
               ))}
           </TabBar>
        )
    }
}