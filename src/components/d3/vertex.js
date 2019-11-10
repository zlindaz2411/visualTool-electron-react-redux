import React, {Component} from 'react';
import * as d3 from "d3";

export default class Vertex extends React.Component {
/**
 * Handle click on the node.
 * @returns {undefined}
 */
handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

/**
 * Handle right click on the node.
 * @param {Object} event - native event.
 * @returns {undefined}
 */
handleOnRightClickNode = event => this.props.onRightClickNode && this.props.onRightClickNode(event, this.props.id);


render() {
    const nodeProps = {
        cursor: this.props.cursor,
        onClick: this.handleOnClickNode,
        onContextMenu: this.handleOnRightClickNode,
    };

    const textProps = {
        // dx: this.props.dx || CONST.NODE_LABEL_DX,
        // dy: CONST.NODE_LABEL_DY,
        fill: this.props.fontColor,
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
    };


        return (
            <g {...gProps}>
                {node}
                {this.props.renderLabel && label}
            </g>
        );
    }
}

