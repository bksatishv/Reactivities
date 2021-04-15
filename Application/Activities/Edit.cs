using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command:IRequest{
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext dbcontext;
            private readonly IMapper mapper;

            public Handler(DataContext dbcontext,IMapper mapper)
            {
                this.dbcontext = dbcontext;
                this.mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await dbcontext.Activities.FindAsync(request.Activity.Id);

                //activity.Title=request.Activity.Title ??=activity.Title;
                mapper.Map(request.Activity,activity);
                await dbcontext.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}