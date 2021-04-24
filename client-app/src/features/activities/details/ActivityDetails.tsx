import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';

export default observer (function ActivityDetails() {
    const {activityStore}=useStore();
    const {selectedActivity:activity,loadActivity,loadingInitial}=activityStore;
    const {id}=useParams<{id:string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id,loadActivity]);
    
    if(loadingInitial||!activity) return<LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfo activity={activity}/>
                <ActivityDetailChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    );
})