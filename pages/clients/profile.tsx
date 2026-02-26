import {
  getClient,
  getClientAdditionalInformation,
  getClientContacts,
  getClientDocuments,
  getClientFunds,
  getClientProfile,
  getClientSettings,
  getLastSigninClient,
  resendInviteParticipant
} from "@/api/functions/client.api";
import {
  getNotes,
  getStaff,
  getStaffCompliance,
  getStaffSettings
} from "@/api/functions/staff.api";
import { getLastSignin, resendInvite } from "@/api/functions/user.api";
import Iconify from "@/components/Iconify/Iconify";
import Compliance from "@/components/staff-compliance/compliance";
import Details from "@/components/client-details/details";
import Notes from "@/components/client-notes/notes";
import { complianceData } from "@/interface/common.interface";
import { ISettings, IStaff } from "@/interface/staff.interfaces";
import assets from "@/json/assets";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Loader from "@/ui/Loader/Loder";
import StyledPaper from "@/ui/Paper/Paper";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  MenuItem,
  Popover,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import {
  useIsFetching,
  useMutation,
  useQueries,
  useQuery
} from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Settings from "@/components/client-settings/settings";
import ClientDocuments from "@/components/client-docuements/documents";
import ClientFunds from "@/components/client-funds/funds";
import ClientContacts from "@/components/client-contacts/client-contacts";
import ClientAdditionalContacts from "@/components/client-additional-contacts/client-additional-contacts";
import AddShift from "@/components/add-shift/add-shift";
import { getRole } from "@/lib/functions/_helpers.lib";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentTemplateInside from "./template-document-inside";
import ParticipantSignDocument from "./[id]/participant-sign-document";
import { getCookie } from "@/lib/functions/storage.lib";
import DetailsClientProfile from "@/components/client-details/details-client-profile";

const StyledViewPage = styled(Grid)`
  padding: 10px;
  h4 {
    margin-bottom: 40px;
  }
`;

interface QueryResult {
  staff: IStaff;
  settings: ISettings;
  compliance: complianceData[];
  last_login: { "Last Login": number };
  notes: {
    notes: string;
  };
  isLoading: boolean;
}

export default function ParticipantProfile({
  handleCloseModal
}: {
  handleCloseModal: () => void;
}) {
  const role = getRole();
  const [shiftModal, setShiftModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const { id } = useParams();
  // const  id  = "2";

  const userCookie = getCookie("client");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const id = Number(user?.id) ? Number(user?.id) : user?.id;

  useEffect(()=>{
    console.log("------------ ID ------------",id)
  },[id])

  function get_client_documents_profile(arg0: string): any {
    throw new Error("Function not implemented.");
  }

  const data = useQueries({
    queries: [
      {
        queryKey: ["client", id],
        queryFn: getClientProfile
      },
      {
        queryKey: ["client-contacts", id],
        queryFn: () => getClientContacts(id as string)
      },
      {
        queryKey: ["client-settings", id],
        queryFn: () => getClientSettings(id as string)
      },
      {
        queryKey: ["client-documents", id],
        queryFn: () => get_client_documents_profile
      },
      // {
      //   queryKey: ["client-funds", id],
      //   queryFn: () => getClientFunds({ clientIds: [Number(id)] })
      // },
      {
        queryKey: ["client-additional-information", id],
        queryFn: () => getClientAdditionalInformation(id as string)
      },
      {
        queryKey: ["last-login", id],
        queryFn: () => getLastSigninClient(id as string)
      }
    ],
    combine: (results) => {
      return {
        client: results[0].data,
        contacts: results[1].data,
        settings: results[2].data,
        documents: results[3].data,
        funds: results[4].data,
        additionalInformation: results[5].data,
        // last_login: results[6].data,
        isLoading:
          results[0].isLoading ||
          results[1].isLoading ||
          results[2].isLoading ||
          results[3].isLoading ||
          results[4].isLoading ||
          results[5].isLoading 
          // results[6].isLoading
      };
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resendInviteParticipant
  });

  useEffect(() => {
    console.log(
      "-------------: *** Data *** :-------------",
      // data.funds[0]?.funds
      data
    );
  }, [data]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const handleRedirectToBillingReport = () => {
    router.push(`/clients/${id}/billing-report`);
  };

  const open = Boolean(anchorEl);

  if (data.isLoading) return <Loader/>;

  
  return (
    <>
    <StyledViewPage container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <Grid container spacing={0}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {data.client && (
                <Box sx={{ paddingBlock: "0px" }}>
                  <DetailsClientProfile client={data.client} handleCloseMod={handleCloseModal} />
                </Box>
              )}     
            </Grid>
          </Grid>
          <br></br>
          {/* <Grid item md={12} sm={12} xs={12} sx={{ border: "1px solid #008d8d", borderRadius: "6px", boxShadow: "0 0 10px 0 #dad8d8ff" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Document Template</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ paddingBlock: "0px" }}>
                  <DocumentTemplateInside></DocumentTemplateInside>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Client Fund</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ paddingBlock: "0px" }}>
                  {role === "ROLE_ADMIN" && (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <ClientFunds funds_data={data.funds[0]?.funds} />
                    </Grid>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Document Signature</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ paddingBlock: "0px" }}>
                  <ParticipantSignDocument />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid> */}
        </Grid>



        <Grid item md={4} sm={12} xs={12}>
          <Grid container spacing={4}>
            {/* {data?.contacts?.primaryContacts.length ? (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {data.contacts && (
                  <ClientContacts contact={data?.contacts?.primaryContacts[0]} />
                )}
              </Grid>
            ) : null} */}

            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              {data.contacts && (<ClientAdditionalContacts
                contacts={data?.contacts?.otherContacts} />)}
            </Grid> */}

            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              {data.settings && (<Settings settings={data.settings} />)}
            </Grid> */}

            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
            {data.settings && ( <Notes {...data.additionalInformation} />)}
            </Grid> */}

          </Grid>
        </Grid>
        {/* <AddShift open={shiftModal} onClose={() => setShiftModal(false)} /> */}
      </StyledViewPage></>
  );
}

