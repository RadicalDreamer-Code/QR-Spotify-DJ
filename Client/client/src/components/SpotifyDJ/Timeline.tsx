import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Song {
    name: string,
    artist: string,
    album: string,
    duration: number,
    likes: number,
}

interface Timeline {
    name: string,
    songs: Song[]
}

interface TimelineProps {
    timelines: Timeline[]
}

export const Timeline = () => {
    return (
        <>
            <Typography component="h1" variant="h5">
                Timeline
            </Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    80s
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
        </>
    )
}