import React, { Component } from 'react';
import '../assets/css/App.css';
import { Table, TableRow, TableCell, TableBody, TableHead, CardContent, Card, Grid} from '@material-ui/core';
import { Creators as ReduxActions } from "../redux/reducers";
import {connect} from "react-redux";
import {TextField} from "@material-ui/core/es/index";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class ShoppingList extends Component {
    render() {
        const {items, classes} = this.props;
        return (
            <Grid>
                <Card>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell numeric>Quantity</TableCell>
                                    <TableCell>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.item}</TableCell>
                                            <TableCell numeric>{row.quantity}</TableCell>
                                            <TableCell>{row.unit}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                        id="outlined-uncontrolled"
                                        label="Item"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"/>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-uncontrolled"
                                            label="quantity"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"/>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-uncontrolled"
                                            label="unit"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
    componentDidMount () {
        const {onTableLoad} = this.props;
        onTableLoad();
    }
}

const mapStateToProps = state => {
    return {
        items: state.reducer.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTableLoad: () =>
            dispatch(ReduxActions.get_items_request())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ShoppingList));