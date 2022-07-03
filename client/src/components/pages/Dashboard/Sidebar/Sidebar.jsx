import React from 'react'
import { LineStyle, Timeline, TrendingUp, PermIdentity, Storefront, LocalAtm, Assessment, Drafts, Feedback, Forum, Work, Receipt, PieChart } from "@material-ui/icons";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from 'react-redux';


const SidebarContainer = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`
const SidebarWrapper = styled.div`
    padding: 20px;
    color: #555;
`
const SidebarMenu = styled.div`
    margin-bottom: 10px;
`
const SidebarTitle = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`
const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`
const SidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    &:hover {
            background-color: rgb(240, 240, 255);
        }
`
const sharedStyle = css`
    margin-right: 5px;
    font-size: 20px !important;
`
const MyPermIdentity = styled(PermIdentity)`
    ${sharedStyle}
`

const Sidebar = () => {

  const { groups } = useSelector(state => state.groups);
  return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarTitle>Action Menu</SidebarTitle>
                    <SidebarList>
                            <button className='btn btn-outline-primary mt-3 ms-auto px-4 rounded-pill' data-bs-toggle='modal' data-bs-target='#addGroupModal'>
                              <i class="fa fa-plus" aria-hidden="true">Add Group Number</i>
                            </button>
                            <button className='btn btn-outline-warning mt-4 px-4 rounded-pill' data-bs-toggle='modal' data-bs-target='#addAssignmentModal'>
                              <i class="fa fa-plus" aria-hidden="true">Add Assignment</i>
                            </button>
                    </SidebarList>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarTitle>All Groups</SidebarTitle>
                    <SidebarList>
                              {groups && groups.map( g => (
                                          <SidebarListItem key={g._id} value={g._id}>                            
                                              <MyPermIdentity />
                                              {g.group}
                                          </SidebarListItem>
                              ))}

                    </SidebarList>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar