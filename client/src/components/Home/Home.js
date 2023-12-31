import React, { useState } from 'react'
import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts'
import Pagination from '../pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from "./styles.js"

function useQuery() {
    return new URLSearchParams(useLocation().search); // in which page are we currently on and what search term are we looking for
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1; //reads our url and see if we have a page parameter and if we don't have the page we must be on the first one
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
        }
        else {
            navigate("/");
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) { // 13 = enter
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]); 

    const handleDelete = (tagsToDelete) => setTags(tags.filter((tag) => tag !== tagsToDelete)); 

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container diretion="column-reverse" justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Search Memories" 
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ChipInput 
                            style={{ margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search Tags"
                            variant="outlined"
                        />
                        <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    {(!searchQuery && !tags.length) && (
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    )}
                </Grid>  
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home