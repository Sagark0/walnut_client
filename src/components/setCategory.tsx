import { FormControl, Select, MenuItem } from "@mui/material";
import { categories } from "../constants/menuItems";
import { SelectChangeEvent } from "@mui/material/Select";
import { Transaction } from "../types";

interface setCategoryProps {
  transaction?: Transaction;
  handleCategoryChange: any;
}

function SetCategory({ transaction, handleCategoryChange }: setCategoryProps) {
  return (
    <FormControl fullWidth variant="standard">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={transaction?.category}
        label="Age"
        onChange={(event: SelectChangeEvent) =>
          handleCategoryChange(event, transaction?.transaction_id)
        }
        sx={{ height: 20, fontSize: "0.75rem", mt: 0.3 }}
      >
        {Object.values(categories).map((c) => (
          <MenuItem
            key={c.category_id}
            value={c.category_id}
            sx={{ fontSize: "0.75rem" }}
          >
            {c.category_label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SetCategory;
