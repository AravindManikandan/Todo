import React from "react";
import {TextField, IconButton} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = (props) => {
    return (
        <TextField className="searchField" fullWidth variant="outlined" {...props}
            InputProps={{
                startAdornment: (
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                ),
            }}
        />
    )
}
export default Search;