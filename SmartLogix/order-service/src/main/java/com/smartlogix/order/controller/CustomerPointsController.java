import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/points")
public class CustomerPointsController {

    private final PointsFileService pointsFileService;

    public CustomerPointsController(PointsFileService pointsFileService) {
        this.pointsFileService = pointsFileService;
    }

    @GetMapping
    public List<CustomerPointsDTO> getAllPoints() {
        return pointsFileService.getAll();
    }
}