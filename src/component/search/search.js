import React, { useState } from "react";
import {TextField, IconButton} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = (props) => {
    const [searchData, setSearchData] = useState('');
    const test =()=>{
        props.onSearchClick(searchData)
    }
    return (
        <TextField name="searchFiled" className="searchField" fullWidth variant="outlined"
        onChange={(e)=>{setSearchData(e.target.value)}}
        {...props}
            InputProps={{
                startAdornment: (
                    <IconButton>
                        <SearchOutlinedIcon onClick={test} />
                    </IconButton>
                ),
            }}
        />
    )
}
export default Search;