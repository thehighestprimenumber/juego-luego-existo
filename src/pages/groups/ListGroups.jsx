import {Box, Card, CardActionArea, Typography} from "@mui/material";
import React from "react";



export function ListGroups({groups}) {
    return <Box style={{display: 'flex', flexDirection:'column'}}>
        {groups.map(group =>
            <Card variant={'outlined'} key={group.id} style={{margin: '10px'}}>
                <CardActionArea href={`missions?groupId=${group.id}`}
                                style={{padding: '5px',}}
                >
                    <Typography variant={'h5'}>
                        {group.description}
                    </Typography>

                </CardActionArea>
            </Card>
        )}
    </Box>

}