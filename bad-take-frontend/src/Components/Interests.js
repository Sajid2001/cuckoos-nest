import { Grid } from "@mui/material";
import Interest from "./Interest";
import InterestForm from "./InterestForm";

export default function Interests({interests}) {

  return (
    <div>
        <Grid container spacing={2}>
        {interests.map(interest => (
            <Grid key={interest} item xs={6} md={4}>
                <Interest interest={interest}/>
            </Grid>
        ))}
            <InterestForm/>
        </Grid>
    </div>
  )
}
