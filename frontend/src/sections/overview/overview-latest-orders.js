import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { submissions = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Submissions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Question ID
                </TableCell>
                <TableCell>
                  Student
                </TableCell>
                {/* <TableCell sortDirection="desc">
                  Date
                </TableCell> */}
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => {
                //const createdAt = format(submission.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={submission.id}
                  >
                    <TableCell>
                      {submission.ref}
                    </TableCell>
                    <TableCell>
                      {submission.student.name}
                    </TableCell>
                    {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
                    <TableCell>
                      <SeverityPill color={statusMap[submission.status]}>
                        {submission.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
